export default {
  props: {
    legendFormatter: {
      type: Function,
      required: false
    }
  },
  methods: {
    legendFormatter(){
      console.log(1);
    }
  }
};
