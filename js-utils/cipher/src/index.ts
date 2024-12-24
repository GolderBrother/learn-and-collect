import { type Encryption, EncryptionFactory } from './cipher';
import { cacheCipher } from './encryptionSetting';
import { useStorage } from '@vueuse/core';
import { merge } from 'lodash-es';
import type { PersistedStateFactoryOptions, Serializer } from 'pinia-plugin-persistedstate';
const persistEncryption: Encryption = EncryptionFactory.createAesEncryption({
	key: cacheCipher.key,
	iv: cacheCipher.iv
});
type Recordable<T = any> = Record<string, T>;
/**
 * Custom serializer for serialization and deserialization of storage data
 * 自定义序列化器，用于序列化和反序列化存储数据
 *
 * @param shouldEnableEncryption whether to enable encryption for storage data 是否启用存储数据加密
 * @returns serializer
 */
function customSerializer(shouldEnableEncryption: boolean): Serializer {
	if (shouldEnableEncryption) {
		return {
			deserialize: (value) => {
				const decrypted = persistEncryption.decrypt(value);
				return JSON.parse(decrypted);
			},
			serialize: (value) => {
				const serialized = JSON.stringify(value);
				return persistEncryption.encrypt(serialized);
			}
		};
	} else {
		return {
			deserialize: (value) => {
				return JSON.parse(value);
			},
			serialize: (value) => {
				return JSON.stringify(value);
			}
		};
	}
}
// 系统缓存是否使用AES加密
const SHOULD_ENABLE_STORAGE_ENCRYPTION = true;

/**
 * Create Persisted State Options
 * 创建持久化状态选项
 * @param keyPrefix prefix for storage key 储存键前缀
 * @returns persisted state factory options
 */
export function createPersistedStateOptions(
	keyPrefix: string,
	storagePaths: string[] = []
): PersistedStateFactoryOptions {
	return {
		afterRestore: (ctx: Recordable) => {
			const restoreData: Recordable = {};
			const storeId = ctx.store.$id;
			for (const storagePath of storagePaths) {
				const restorePathData = ctx.store?.[storagePath];
				restoreData[storagePath] = restorePathData;
			}
			useStorage(`${keyPrefix}__${storeId}`, restoreData, localStorage, {
				mergeDefaults: (storageValue: any, defaults: any) => merge(storageValue, defaults)
			});
		},
		// 需要看情况指定 state 中哪些数据需要被持久化
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		paths: storagePaths,
		storage: localStorage,
		key: (id: string) => `${keyPrefix}__${id}`,
		serializer: customSerializer(SHOULD_ENABLE_STORAGE_ENCRYPTION)
	};
}
