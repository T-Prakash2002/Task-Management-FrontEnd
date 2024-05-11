import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage1 = new EncryptStorage('secret-key-value', {
  prefix: '@instance1',
  
});

export const encryptStorage2 = new EncryptStorage('secret-key-value', {
  prefix: '@xample',
  storageType: 'sessionStorage',
});

