import createDOMForm from 'rc-form/lib/createDOMForm';

const customCreateForm = () =>
  createDOMForm({
    validateMessages: {
      required(field) {
        return 'Campo requerido';
      }
    }
  });

export { customCreateForm as createForm };