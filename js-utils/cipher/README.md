# Pinia 持久化状态插件（支持加解密）

这是一个自定义的 Pinia 插件，提供持久化状态管理功能，并支持使用 AES 加密。它允许你将应用程序的状态存储在 `localStorage` 中，同时确保敏感数据得到加密。

## 特性

- **持久化状态**：自动将状态保存到 `localStorage` 并恢复。
- **加密支持**：可选地使用 AES 加密存储的数据。
- **自定义序列化**：提供自定义序列化器，用于处理数据的序列化和反序列化。

## 安装

要使用此插件，请确保安装以下依赖：

```bash
npm install pinia @vueuse/core lodash-es
```

## 使用方法

### 第一步：导入并配置插件

首先，导入必要的函数并创建持久化状态选项。

```typescript
import { createPersistedStateOptions } from './path/to/your/plugin';

// 定义你的 store
const useMyStore = defineStore('myStore', {
  state: () => ({
    // 你的状态属性
  }),
  persist: createPersistedStateOptions('myApp', ['yourStateProperty']),
});
```

### 第二步：启用或禁用加密

你可以通过设置插件文件中的 `SHOULD_ENABLE_STORAGE_ENCRYPTION` 常量来控制是否启用加密。默认情况下，它被设置为 `true`。

```typescript
const SHOULD_ENABLE_STORAGE_ENCRYPTION = true; // 设置为 false 以禁用加密
```

### 第三步：定义加密设置

确保在 `cipher.ts` 和 `encryptionSetting.ts` 中定义你的加密设置：

```typescript
// cipher.ts
export type Encryption = {
  encrypt: (data: string) => string;
  decrypt: (data: string) => string;
};

export const EncryptionFactory = {
  createAesEncryption: ({ key, iv }: { key: string; iv: string }): Encryption => {
    // 在这里实现你的 AES 加密逻辑
  },
};

// encryptionSetting.ts
export const cacheCipher = {
  key: 'your-encryption-key',
  iv: 'your-initialization-vector',
};
```

### 第四步：在组件中使用 Store

现在你可以像往常一样在 Vue 组件中使用你的 store。状态将被持久化到 `localStorage` 中，如果启用了加密，则会被加密。

```vue
<template>
  <div>
    <button @click="updateState">更新状态</button>
  </div>
</template>

<script setup>
import { useMyStore } from './path/to/your/store';

const store = useMyStore();

function updateState() {
  store.yourStateProperty = '新值';
}
</script>
```

## 自定义序列化器

该插件使用自定义序列化器来处理存储数据的加密和解密。`customSerializer` 函数检查是否启用了加密，并应用相应的序列化逻辑。

### 序列化器函数

- **serialize**：将状态转换为 JSON 字符串，并在启用加密时进行加密。
- **deserialize**：在启用加密时解密存储的数据并将其解析回对象。

## 许可证

本项目采用 MIT 许可证。有关详细信息，请参见 [LICENSE](LICENSE) 文件。

## 贡献

欢迎贡献！请随时提交拉取请求或打开问题以进行任何增强或修复。

---

此 README 提供了有关如何使用支持加解密的 Pinia 持久化状态插件的全面概述。