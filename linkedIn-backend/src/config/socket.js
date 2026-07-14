let ioInstance = null;

export const initSocket = (io) => {
    ioInstance = io;
};

export const getIO = () => {
    return ioInstance;
};
