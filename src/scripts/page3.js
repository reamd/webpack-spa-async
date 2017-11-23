/**
 * Created by reamd on 2017/11/10.
 */
import $ from 'jquery'
module.exports =  class {
    constructor () {
        $('.page3').html('page3')
    }
    attachEvent () {
        $('.page3').on('click', function () {
            console.log(33333)
        })
    }
}