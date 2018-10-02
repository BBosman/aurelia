import { IServiceLocator } from '@aurelia/kernel';
import { IExpression } from './ast';
import { IBinding, IBindingTarget } from './binding';
import { IScope } from './binding-context';
import { BindingFlags } from './binding-flags';
import { EvaluateVisitor } from './evaluate-visitor';
import { UnbindVisitor, BindVisitor } from './bind-visitor';

export class Ref implements IBinding {
  public $isBound: boolean = false;
  private $scope: IScope;

  constructor(
    public sourceExpression: IExpression,
    public target: IBindingTarget,
    public locator: IServiceLocator) {
  }

  public $bind(flags: BindingFlags, scope: IScope) {
    if (this.$isBound) {
      if (this.$scope === scope) {
        return;
      }

      this.$unbind(flags);
    }

    this.$isBound = true;
    this.$scope = scope;

    BindVisitor.bind(flags, this.$scope, <any>this, this.sourceExpression);

    this.sourceExpression.assign(flags, this.$scope, this.locator, this.target);
  }

  public $unbind(flags: BindingFlags) {
    if (!this.$isBound) {
      return;
    }

    this.$isBound = false;

    if (EvaluateVisitor.evaluate(flags, this.$scope, this.locator, this.sourceExpression) === this.target) {
      this.sourceExpression.assign(flags, this.$scope, this.locator, null);
    }

    UnbindVisitor.unbind(flags, this.$scope, <any>this, this.sourceExpression);

    this.$scope = null;
  }

  public observeProperty(context: any, name: any) { }
}
