/*
 * Global FogManager Configuration Options
 */

export default [
  {
    name: 'userModes',
    data: {
      name: 'User Read/Write Modes',
      scope: 'world',
      config: false,
      type: Object,
      default: null,
    },
  },
  {
    name: 'autoShare',
    data: {
      name: 'Automatic sharing of fog updates',
      scope: 'world',
      config: false,
      type: Boolean,
      default: false,
    },
  },
];
