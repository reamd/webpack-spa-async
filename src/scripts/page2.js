/**
 * Created by reamd on 2017/11/10.
 */
import $ from 'jquery'
module.exports =  class {
    constructor () {
        $('.page2').html('page2')
    }

    attachEvent () {
        $('.page2').on('click', function () {
            console.log(22222)
        })
    }
}