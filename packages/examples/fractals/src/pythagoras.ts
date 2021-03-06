import { customElement, bindable } from '@aurelia/runtime';
import { State } from './state';
import view from './pythagoras.html';

const MAX_LEVEL = 10;

@customElement({
  name: 'pythagoras',
  template: (() => {
    const parser = document.createElement('div');
    parser.innerHTML = view;
    const template = parser.firstElementChild as HTMLTemplateElement;
    const svg = template.content.firstElementChild;
    while (svg.firstChild) {
      template.content.appendChild(svg.firstChild);
    }
    svg.remove();
    template.remove();
    return template;
  })(),
  build: {
    required: true,
    compiler: 'default'
  },
  instructions: []
})
export class Pythagoras {

  static inject = [State];

  renderLeft: boolean;
  renderRight: boolean;

  @bindable()
  level: number;

  fill: string;

  constructor(
    public state: State
  ) {
  }

  bound() {
    this.renderLeft = this.renderRight = this.level < MAX_LEVEL;
    this.fill = memoizedViridis(this.level, MAX_LEVEL);
  }
}

const memoizedViridis = (() => {
  const memo: Record<string, any> = {};
  const key = (lvl: number, maxlvl: number) => `${lvl}_${maxlvl}`;
  return (lvl: number, maxlvl: number) => {
    const memoKey = key(lvl, maxlvl);
    if (memoKey in memo) {
      return memo[memoKey];
    } else {
      const random = Math.random().toString(16);
      return memo[memoKey] = `#${random.substring(random.length - 6)}`;
    }
  };
})();
