export const useConvert = () => {
  const toServer = (dynamicfields: any[], withValue: boolean = false) => {
    let AdditionalField: any = {};
    const count: any = {};

    dynamicfields.forEach((field) => {
      count[field.type] ? count[field.type]++ : (count[field.type] = 1);
      AdditionalField[`${field.type}_${count[field.type]}`] = withValue
        ? field.value
        : field.name;
    });
    return AdditionalField;
  };

  const toEdit = (AdditionalField: any, AdditionalFieldsValue: any) => {
    const fields: any[] = [];
    let i = 0;
    for (const key in AdditionalField) {
      if (Object.prototype.hasOwnProperty.call(AdditionalField, key)) {
        fields.push({
          id: i,
          key: AdditionalField[key],
          value: AdditionalFieldsValue[key],
          name: key,
          type: key.slice(0, key.length - 2),
        });
        i++;
      }
    }
    return fields;
  };

  const fromServer = (AdditionalField: any) => {
    const dynamicfields = [];
    let i = 0;
    const value: any = {
      number: 0,
      string: "",
      text: "",
      boolean: false,
      date: new Date().toDateString(),
    };
    for (const key in AdditionalField) {
      if (Object.prototype.hasOwnProperty.call(AdditionalField, key)) {
        AdditionalField[key] &&
          dynamicfields.push({
            id: i,
            name: AdditionalField[key],
            value:
              key.slice(0, -2) !== "text"
                ? value[key.slice(0, -2)]
                : AdditionalField[key],
            type: key.slice(0, -2),
          });
      }
      i++;
    }
    return dynamicfields;
  };

  return { toServer, fromServer, toEdit };
};
