import storage from './storage';
import axios from 'axios';

export const check = (_loggedInfo) => {
    let returnValue;
    const loggedInfo = storage.get(_loggedInfo)
        ? storage.get(_loggedInfo)
        : storage.remainGet(_loggedInfo);
    if (!loggedInfo) return { success: false };

    try {
        axios
            .post('/api/oauth/check', loggedInfo)
            .then((res) => {
                console.log('응답 반응:', res);
                if (!res.data.success) {
                    storage.remove(_loggedInfo);
                    returnValue = { success: false };
                }
                returnValue = { success: true, value: loggedInfo };
            })
            .catch((err) => {
                console.log(err);
            });
    } catch {
        returnValue = { success: false };
        storage.remove(_loggedInfo);
        storage.removeRemain(_loggedInfo);
        window.location.href = '/login?expired';
    }
    console.log('teisitoj');
    console.log(returnValue);
    return returnValue;
};
