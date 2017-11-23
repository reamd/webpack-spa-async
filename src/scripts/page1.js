/**
 * Created by reamd on 2017/11/10.
 */
module.exports = class {
    constructor () {
        $('.page1').html('page1')
    }

    attachEvent () {
        $('.page1').on('click', function () {
            require.ensure(['./page2'], function(){
                console.log('b')
                let Page2 = require('./page2')
                let page2 = new Page2
                page2.attachEvent()
            }, 'page2')

            require.ensure(['./page3'], function(){
                console.log('c')
                let Page3 = require('./page3')
                let page3 = new Page3
                page3.attachEvent()
            }, 'page3')
        })
    }
}

