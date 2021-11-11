const UNIT_POSTFIX = [' B', ' KB', ' MB', ' GB', ' TB', ' PB'];
export default {
    byteToUnit: function(val){
      var valLength = parseInt(String(val).length / 3);
      var unitValue = parseFloat(val) / 1024 ** valLength;
      return (Math.round(unitValue * 10)) / 10 + UNIT_POSTFIX[valLength];
    }
}