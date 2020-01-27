import {Component, h, Prop} from '@stencil/core';
@Component({
  tag: 'zap-tooltip',
  shadow: true,
  styleUrl: './tooltip.css'
})
export class Tooltip {
  @Prop({reflect: true, mutable: true}) displayTooltip: boolean = false;
  @Prop() tooltipText: string = 'Nothing I can help with';

  render() {
    return (
      <span>
        <slot />
        <span class="tooltip-icon"
              onClick={this.toggleTooltip.bind(this)}>?</span>
        {this.displayTooltip && (
          <div class="tooltip-container">
            {this.tooltipText}
          </div>
        )}
      </span>
    )
  }

  toggleTooltip() {
    this.displayTooltip = !this.displayTooltip
  }
}
