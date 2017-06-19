import notice from '../libs/notice';

notice.listen('init', (data) => {
  console.log(data);
});

setTimeout(() => {
  notice.publish('init', [{ test: 222 }]);
}, 3000);
