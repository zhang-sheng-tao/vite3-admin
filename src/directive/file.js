import { typeOf, IsPC } from "@/utils/method";

// v-file:[order1].xls.multiple="testV" 上传文件
export function file(el, binding) {
  if (typeOf(binding.value) !== "Function") {
    return console.error(new Error("请绑定回调函数"));
  }
  if ((binding.modifiers.img && binding.modifiers.xls) || (!binding.modifiers.img && !binding.modifiers.xls)) {
    return console.error(new Error("只允许上传一种文件格式哦"));
  }
  el.style.cursor = "pointer";
  el.onclick = () => {
    let input = document.createElement("input");
    let flieList = [];
    input.type = "file";
    if (binding.modifiers.xls) {
      input.accept = ".xlsx,.xls,.csv,.xlsm,.xlsb";
    }
    if (binding.modifiers.img) {
      // input.accept = 'image/*'
      input.accept = ".jpg,.png,.gif,.webp,.bmp,.svg";
    }
    if (binding.modifiers.multiple) {
      input.multiple = "multiple";
    }
    input.click();
    input.addEventListener("change", files);
    function files(e) {
      const flies = e.path[0].files;
      Object.keys(flies).forEach((item) => {
        flieList.push(flies[item]);
      });
      binding.value(flieList);
      input.removeEventListener("change", files);
      input = null;
      flieList = null;
    }
  };
}
// 滚动行为
export function isScroll(el, binding) {
  //IsPC()= true为PC端，IsPC()=false为手机端
  el.style.userSelect = "none";
  const { x, y } = binding.modifiers;
  const ol = el.firstElementChild;
  const typeEventdown = IsPC() ? "mousedown" : "touchstart"; // 鼠标按下
  const typeEventmove = IsPC() ? "mousemove" : "touchmove"; // 鼠标滑动
  const typeEvenup = IsPC() ? "mouseup" : "touchend"; // 鼠标抬起
  let offset = 50; //最大溢出值
  let cur = 0; //列表滑动位置
  let isDown = false; // 鼠标是否按下
  let vy = 0; //滑动的力度
  let fl = 150; //弹力,值越大,到度或到顶后,可以继续拉的越远
  let isInTransition = false; //是否在滚动中

  el.addEventListener(typeEventdown, function (e) {
    if (isInTransition) return; //如果在滚动中，则中止执行
    if (this._timer) clearTimeout(this._timer); //清除定时器
    vy = 0;
    let event = e;
    if (!IsPC()) {
      event = e.touches[0];
      event.timeStamp = e.timeStamp;
    }
    if (y) {
      this._oy = event.clientY - cur; //计算鼠标按下位置与列表当前位置的差值,列表位置初始值为0
      this._cy = event.clientY; //鼠标按下的位置
      this._oh = this.scrollHeight; //列表的高度
      this._ch = this.clientHeight; //容器的高度
    }
    if (x) {
      this._ox = event.clientX - cur; //计算鼠标按下位置与列表当前位置的差值,列表位置初始值为0
      this._cx = event.clientX; //鼠标按下的位置
      this._ow = this.scrollWidth; //列表的高度
      this._cw = this.clientWidth; //容器的高度
    }
    this._startTime = event.timeStamp; //鼠标按下时的时间戳
    isDown = true; //鼠标是否有按下，主要防止用户是从容器外开始滑动的
  });

  el.addEventListener(
    typeEventmove,
    function (e) {
      if (isDown) {
        let event = e;
        if (!IsPC()) {
          event = e.touches[0];
          event.timeStamp = e.timeStamp;
        }
        if (event.timeStamp - this._startTime > 40) {
          this._startTime = e.timeStamp; //慢速滑动不产生力度，所以需要实时更新时间戳
          if (y) cur = event.clientY - this._oy;
          if (x) cur = event.clientX - this._ox;
          //如:列表初始位置为0,鼠标在5的位置按,那么差值为5,此处假如鼠标从5滑动到了3,向上滑,cur = 3-5 =-2  ,假如鼠标从5滑动到了7,向下滑,cur= 7 - 5 = 2
          if (cur > 0) {
            cur *= fl / (fl + cur); //弹力公式:位置*=弹力/(弹 力+位置)
          } else if (cur < this._ch - this._oh && y) {
            cur += this._oh - this._ch;
            cur = (cur * fl) / (fl - cur) - this._oh + this._ch;
          } else if (cur < this._cw - this._ow && x) {
            cur += this._ow - this._cw;
            cur = (cur * fl) / (fl - cur) - this._ow + this._cw;
          }
          setPos(cur); //移动列表
        }
        if (y) {
          vy = event.clientY - this._cy; //记录本次移动后,与前一次鼠标位置的滑动的距离,快速滑动时才有效,慢速滑动时差值为 1 或 0,vy可以理解为滑动的力度
          this._cy = event.clientY; //更新前一次位置为现在的位置,以备下一次比较
        }
        if (x) {
          vy = event.clientX - this._cx; //记录本次移动后,与前一次鼠标位置的滑动的距离,快速滑动时才有效,慢速滑动时差值为 1 或 0,vy可以理解为滑动的力度
          this._cx = event.clientX; //更新前一次位置为现在的位置,以备下一次比较
        }
      }
    },
    false
  );

  function setPos(val) {
    if (y) {
      ol.style.transform = `translate(0px,${val}px)`;
    }
    if (x) {
      ol.style.transform = `translate(${val}px,0px)`;
    }
  }

  el.addEventListener("mouseleave", mleave, false);
  el.addEventListener(typeEvenup, mleave, false);

  function ease(target) {
    isInTransition = true;
    el.timer = setInterval(function () {
      cur -= (cur - target) * 0.2;
      if (Math.abs(cur - target) < 1) {
        //减到 当前位置 与 目标位置相差小于1 之后直接归位
        cur = target;
        clearInterval(el.timer);
        isInTransition = false;
      }
      setPos(cur);
    }, 20);
  }

  function mleave() {
    if (isDown) {
      isDown = false;
      var t = this;
      var friction = ((vy >> 31) * 2 + 1) * 0.5; //根据力度套用公式计算出惯性大小,公式要记住
      var oh;
      if (y) {
        oh = this.scrollHeight - this.clientHeight;
      }
      if (x) {
        oh = this.scrollWidth - this.clientWidth;
      }
      this._timer = setInterval(function () {
        vy -= friction; //力度按 惯性的大小递减
        cur += vy; //转换为额外的滑动距离
        setPos(cur); //滑动列表
        if (-cur - oh > offset) {
          //如果列表底部超出了
          clearTimeout(t._timer);
          ease(-oh); //回弹
          return;
        }
        if (cur > offset) {
          //如果列表顶部超出了
          clearTimeout(t._timer);
          ease(0); //回弹
          return;
        }
        if (Math.abs(vy) < 1) {
          //如果力度减小到小于1了,再做超出回弹
          clearTimeout(t._timer);
          if (cur > 0) {
            ease(0);
            return;
          }
          if (-cur > oh) {
            ease(-oh);
            return;
          }
        }
      }, 20);
    }
  }
}

export function tscroll(el, binding) {
  el.style.userSelect = "none";
  const { x: scrollX, y: scrollY } = binding.modifiers;
  const ol = el.firstElementChild;
  const ispc = IsPC(); //true为PC端,false为手机端
  const typeEventdown = ispc ? "mousedown" : "touchstart"; // 鼠标按下
  const typeEventmove = ispc ? "mousemove" : "touchmove"; // 鼠标滑动
  const typeEvenup = ispc ? "mouseup" : "touchend"; // 鼠标抬起
  let parentDomWH = ""; // 记录父元素宽或高,容器
  let childrenDomWH = ""; // 记录子元素宽或高,列表
  let isDown = false;
  let cur = 0; // 列表滑动位置
  let fv = 0; //弹力公式:位置*=弹力/(弹 力+位置)
  let isInTransition = false; // 是否在滚动中

  // 鼠标按下
  el.addEventListener(typeEventdown, Eventdown);
  function Eventdown(e) {
    let event = e;
    if (!ispc) {
      event = e.touches[0];
      event.timeStamp = e.timeStamp;
    }
    if (scrollX) {
      parentDomWH = el.clientWidth;
      childrenDomWH = ol.scrollWidth;
      this._start = event.clientX;
      this._gap = event.clientX - cur;
    }
    if (scrollY) {
      parentDomWH = el.clientHeight;
      childrenDomWH = ol.scrollHeight;
      this._start = event.clientY;
      this._gap = event.clientY - cur;
    }
    this._timeStamp = e.timeStamp;
    isDown = true;
  }

  // 鼠标移动
  el.addEventListener(typeEventmove, Eventmove, false);
  function Eventmove(e) {
    if (isDown) {
      let event = e;
      if (!ispc) {
        event = e.touches[0];
        event.timeStamp = e.timeStamp;
      }
      if (scrollX) {
        cur = event.clientX - this._gap;
        fv = event.clientX - this._start;
        this._start = event.clientX;
      }
      if (scrollY) {
        cur = event.clientY - this._gap;
        fv = event.clientY - this._start;
        this._start = event.clientY;
      }

      setPos(cur);
    }
  }

  // 鼠标抬起
  el.addEventListener(typeEvenup, mouseup, false);
  function mouseup(e) {
    if (isDown) {
      let event = e;
      if (!ispc) {
        event = e.touches[0];
        // event.timeStamp = e.timeStamp;
      }
      isDown = false;
      console.log(e, "抬起");
    }
  }

  // 改变位置
  function setPos(val) {
    if (scrollY) {
      ol.style.transform = `translate(0px,${val}px)`;
    }
    if (scrollX) {
      ol.style.transform = `translate(${val}px,0px)`;
    }
  }

  // 鼠标离开当前元素
  if (ispc) el.addEventListener("mouseleave", mouseover, false);
  function mouseover(e) {
    isDown = false;
    // el.removeEventListener(typeEventdown, Eventdown);
    // el.removeEventListener(typeEventmove, Eventmove);
    // el.removeEventListener(typeEvenup, mouseup);
  }
}
