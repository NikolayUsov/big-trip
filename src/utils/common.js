export const createNode = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;
  return container.firstChild;
};

export const isObject = (obj) => {
  return obj !== null && obj.constructor.name === 'Object';
};

export const deepClone = (obj) => {
  const cloneObject = {};
  for (const i in obj) {
    if (isObject(obj[i])) {
      cloneObject[i] = deepClone(obj[i]);
      continue;
    }
    cloneObject[i] = obj[i];
  }

  return cloneObject;
};
