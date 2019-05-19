const CHOOSE_COLOR = 'CHOOSE_COLOR';
const CHANGE_UI = 'CHANGE_UI';
exports default {
    chooseColor = (color) => ({
        type: CHOOSE_COLOR,
        payload: {
          color,
        },
      }),
      changeUI = (color) => ({
        type: CHANGE_UI,
        payload: {
          color,
        },
      });
}
