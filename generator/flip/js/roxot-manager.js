(function (c) {
    if (isEngineInited()){
        return;
    }

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = 1;
    script.src = c.managerUrl;
    script.dataset.roxotInited = 'true';

    let head = document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild);

    window.rom = window.rom || {cmd: [], icmd: []};
    window.rom.icmd = window.rom.icmd || [];
    window.rom.icmd.push(c);

    function isEngineInited(){
        return  document.querySelectorAll('[data-roxot-inited]').length;
    }
})({"publisherId":"39987cbf-8221-497b-984a-ed27241de46c","adBlockMode":"iframe","engineFileName":"roxot-common-engine.js","managerUrl":"https:\/\/cdn-plus.roxot-panel.com\/wrapper\/js\/common-engine.js?v=s-a44e0a27-71dc-4d0b-b8e1-57e081f0d9d1","wrapperUrl":"https:\/\/cdn-plus.roxot-panel.com\/wrapper\/js\/wrapper.js?v=s-a44e0a27-71dc-4d0b-b8e1-57e081f0d9d1","placementConfigTemplate":"https:\/\/cdn-plus.roxot-panel.com\/wrapper-builder\/placement\/__PLACEMENT_ID__?v=d-a718cc6f-3a96-4a2c-a92b-a54168451e3f","gfsPlacementOptionsTemplate":"https:\/\/cdn-plus.roxot-panel.com\/wrapper-builder\/gfs-placement\/__PLACEMENT_ID__?v=d-a718cc6f-3a96-4a2c-a92b-a54168451e3f","isLanguageSpecific":false,"hostConfig":{"unicode-table.com":{"wrapperOptions":{"universalPlaceHolder":{"enabled":true,"placeHolderContainerConfig":{"backgroundColor":"#DCDCDC"},"noticeContainerConfig":{"backgroundColor":"#D3D3D3","backgroundBorderColor":"#D3D3D3"},"noticeMessageConfig":{"color":"#000000","fontSize":"14px","text":"Loading..."}}},"isAcceptableAdsEnabled":false}},"isBrowserSpecific":false,"isOsSpecific":false,"isDeviceTypeSpecific":false,"dynamicUrlTemplate":"https:\/\/cdn-plus.roxot-panel.com\/wrapper-builder\/39987cbf-8221-497b-984a-ed27241de46c\/dynamic.js?host=__HOST__&v=d-a718cc6f-3a96-4a2c-a92b-a54168451e3f__s-a44e0a27-71dc-4d0b-b8e1-57e081f0d9d1","wrapperConfig":{"host":"unicode-table.com","engineFileName":"roxot-common-engine.js","prebid":{"adjustment":{"adriver":0.89,"appnexus":0.9,"between":0.9,"criteo":0.76,"mytarget":0.1,"otm":0.89,"rtbhouse":0.74},"path":"https:\/\/cdn-plus.roxot-panel.com\/wrapper\/js\/prebid.js?v=s-a44e0a27-71dc-4d0b-b8e1-57e081f0d9d1"},"prebidAnalyticsIntegration":{"enabled":true,"publisherId":"92707dda-5614-4d3a-b4f5-531645d13ecf","auctionSettings":{"isNeedToSend":true,"sampleCoefficient":10},"impressionSettings":{"isNeedToSend":true,"sampleCoefficient":10}},"adfox":{"hb":{"timeout":1000,"biddersMap":{"myTarget":"1355235","betweenDigital":"1355253","rtbhouse":"1393902","criteo":"1393905","getintent":"1393904","otm":"1393903","videonow":"1407059"}}},"videojsLibs":{"path":"https:\/\/cdn-plus.roxot-panel.com\/wrapper\/js\/video-libs.js?v=s-a44e0a27-71dc-4d0b-b8e1-57e081f0d9d1"},"pageUrlVariableName":"roxotPlusPageUrl"},"lazyLoading":[]})