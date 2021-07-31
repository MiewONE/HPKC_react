const storage = {
    set: (key, object) => {
        if (!sessionStorage) return;
        sessionStorage[key] =
            typeof object === 'string' ? object : JSON.stringify(object);
    },
    get: (key) => {
        if (!sessionStorage) return null;
        if (!sessionStorage[key]) {
            return null;
        }
        try {
            const parsed = JSON.parse(sessionStorage[key]);
            return parsed;
        } catch (e) {
            return sessionStorage[key];
        }
    },
    remove: (key) => {
        if (!sessionStorage) return null;
        if (sessionStorage[key]) {
            sessionStorage.removeItem(key);
        }
    },
    remain: (key, object) => {
        if (!localStorage) return;
        localStorage[key] =
            typeof object === 'string' ? object : JSON.stringify(object);
    },
    removeRemain: (key) => {
        if (!localStorage) return null;
        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
    },
    remainGet: (key) => {
        if (!localStorage) return null;
        if (!localStorage[key]) {
            return null;
        }
        try {
            const parsed = JSON.parse(localStorage[key]);
            return parsed;
        } catch (e) {
            return localStorage[key];
        }
    },
};

export default storage;
