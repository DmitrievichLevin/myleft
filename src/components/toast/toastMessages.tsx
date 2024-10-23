import { ReactNode } from 'react';
import { toast, Slide, UpdateOptions } from 'react-toastify';

export const ErrorNotification = (message: string) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  });

export const SuccessNotification = (message: string) =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'colored',
    transition: Slide,
  });

type ToastUpdateOptions = {
  render: string | ReactNode;
  progress?: number;
  delay?: number;
  callback?: () => void;
  error?: string;
};

export const UpdateToast = (id: any, opts: ToastUpdateOptions) => {
  const {
    render = 'Missing Render',
    progress = undefined,
    delay = 5000,
    callback,
    error = undefined,
  } = opts;

  let update_options = { render, progress } as UpdateOptions;

  if (error) {
    update_options = {
      ...update_options,
      render: error,
      type: 'error',
      className: 'rotateY animated',
    };
  }

  if (progress === 1) {
    update_options.progress = undefined;
    update_options.autoClose = 5000;
    if (!error) update_options.type = 'success';
  }

  const _update = setTimeout(() => {
    toast.update(id, update_options);
    if (callback) callback();
    clearTimeout(_update);
  }, delay);
};
