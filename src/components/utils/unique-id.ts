import { v5 as uuidv5 } from 'uuid';

export const useUniqueId = () => {
  const namespace = '1b671a64-40d5-491e-99b0-da01ff1f3341'; // A predefined UUID for namespace

  const digify = (createdAt: string) => {
    const uniqueId = uuidv5(createdAt, namespace);
    const tenDigitId = parseInt(uniqueId.replace(/-/g, '').slice(0, 10), 16);
    return tenDigitId;
  };

  return digify;
};
