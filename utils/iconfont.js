// utils/iconfont.js
import { defineComponent } from 'vue';

const IconFont = defineComponent({
  name: 'IconFont',
  props: {
    name: String,
    size: {
      type: [Number, String],
      default: 16
    },
    color: String
  },
  setup(props) {
    const style = {
      fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
      color: props.color
    };

    return () => (
      <svg class="icon" style={style} aria-hidden="true">
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    );
  }
});

export default IconFont;