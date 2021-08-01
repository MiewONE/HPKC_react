import storage from './lib/storage';
import { useDispatch } from 'react-redux';
import { logout, setLoggedInfo } from './store/modules/user';
import axios from 'axios';

let returnValue;
const _loggedInfo = 'loggedInfo';

const loggedInfo = storage.get(_loggedInfo)
    ? storage.get(_loggedInfo)
    : storage.remainGet(_loggedInfo);
if (!loggedInfo) return;

dispatch(setLoggedInfo(loggedInfo));

try {
    axios
        .post('/oauth/check', loggedInfo)
        .then((res) => {
            console.log(res);
            if (!res.data.success) {
                storage.remove(_loggedInfo);
                returnValue = {};
                dispatch(logout()); //리턴할 값을 집어 넣자.
                window.location.href = '/';
                alert('다시 로그인해주시 바랍니다.');
            }
            setLogined(true); // 리턴할 값을 내보내야함.
        })
        .catch((err) => {
            console.log(err);
        });
} catch {
    storage.remove(_loggedInfo);
    storage.removeRemain(_loggedInfo);
    window.location.href = '/login?expired';
}
