"use strict";

const func = () => {

  // アクティブなウィンドウのURLを取得する
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, (e) => {
    const tabUrl = e[0].url,

      // 該当外
      alertElement = document.getElementById('js-textWrap'),
      listElement = document.getElementById('js-listWrap'),
      emptyText = () => {
        alertElement.innerHTML = '<p>This page is not applicable.</p>';
        listElement.classList.add('hide');
      };

    // URLのドメインまでを取得する
    let resultUrl;

    const regexHostDomain = new RegExp(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/),
      regexScheme = new RegExp(/^(https?):\/{2,}/);

    if (regexScheme.test(tabUrl)) {
      resultUrl = tabUrl.match(regexHostDomain)[0];
    } else {
      emptyText();
      return false;
    }

    // 切り替える開発環境分の変数を作成する
    let devUrl, stgUrl, relUrl;

    // 切り替えるドメインの数だけ配列を作成する
    // corporate
    const strLink = [
        [
          'https://www.google.com/',
          'https://www.yahoo.co.jp/',
          'https://www.microsoft.com/'
        ]
      ],

      target01 = strLink[0];
    // console.log(target01);

    if (target01.includes(resultUrl)) {
      devUrl = tabUrl.replace(regexHostDomain, target01[0]);
      stgUrl = tabUrl.replace(regexHostDomain, target01[1]);
      relUrl = tabUrl.replace(regexHostDomain, target01[2]);
    }

    // 該当外
    else {
      emptyText();
      return false;
    };

    // URLが書き換えられているか確認する
    // console.log(relUrl,stgUrl,devUrl);

    // ポップアップに書き換え後の要素を追加する
    const relLink = document.getElementById('js-rel'),
      stgLink = document.getElementById('js-stg'),
      devLink = document.getElementById('js-dev'),

      relLinkMsg = `
      <dl>
        <dt>Production</dt>
        <dd><a href="${relUrl}" target="_blank">${relUrl}</a></dd>
      </dl>`,

      stgLinkMsg = `
      <dl>
        <dt>Staging</dt>
        <dd><a href="${stgUrl}" target="_blank">${stgUrl}</a></dd>
      </dl>`,

      devLinkMsg = `
      <dl>
        <dt>Development</dt>
        <dd><a href="${devUrl}" target="_blank">${devUrl}</a></dd>
      </dl>`;

    relLink.insertAdjacentHTML('beforeend', relLinkMsg);
    stgLink.insertAdjacentHTML('beforeend', stgLinkMsg);
    devLink.insertAdjacentHTML('beforeend', devLinkMsg);
  });
}
func();