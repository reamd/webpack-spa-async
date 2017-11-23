/**
 * Created by reamd on 2017/11/10.
 */
import './main.scss'
require.ensure(['./scripts/page1'], function(){
    console.log('a')
    let Page1 = require('./scripts/page1')
    let page1 = new Page1
    page1.attachEvent()
}, 'page1')