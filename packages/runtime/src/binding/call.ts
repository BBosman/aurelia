import { BindVisitor, UnbindVisitor } from './bind-visitor';
import { IIndexable, IServiceLocator, Primitive } from '@aurelia/kernel';
import { INode } from '../dom';
import { IExpression } from './ast';
import { IBinding } from './binding';
import { IScope } from './binding-context';
import { BindingFlags } from './binding-flags';
import { EvaluateVisitor } from './evaluate-visitor';
import { IAccessor } from './observation';
import { IObserverLocator } from './observer-locator';

export class Call implements IBinding {
  public $isBound: boolean = false;
  public targetObserver: IAccessor;
  private $scope: IScope;

  constructor(
    public sourceExpression: IExpression,
    target: INode,
    targetProperty: string,
    observerLocator: IObserverLocator,
    public locator: IServiceLocator) {
    this.targetObserver = observerLocator.getObserver(target, targetProperty);
  }

  public callSource(args: IIndexable): Primitive | IIndexable {
    const overrideContext = this.$scope.overrideContext;
    Object.assign(overrideContext, args);
    const result = EvaluateVisitor.evaluate(BindingFlags.mustEvaluate, this.$scope, this.locator, this.sourceExpression);

    for (const prop in args) {
      delete overrideContext[prop];
    }

    return result;
  }

  public $bind(flags: BindingFlags, scope: IScope): void {
    if (this.$isBound) {
      if (this.$scope === scope) {
        return;
      }

      this.$unbind(flags);
    }

    this.$isBound = true;
    this.$scope = scope;

    BindVisitor.bind(flags, scope, <any>this, this.sourceExpression);

    this.targetObserver.setValue($args => this.callSource($args), flags);
  }

  public $unbind(flags: BindingFlags): void {
    if (!this.$isBound) {
      return;
    }

    this.$isBound = false;

    UnbindVisitor.bind(flags, this.$scope, <any>this, this.sourceExpression);

    this.$scope = null;
    this.targetObserver.setValue(null, flags);
  }

  // tslint:disable-next-line:no-empty
  public observeProperty(): void { }
}
