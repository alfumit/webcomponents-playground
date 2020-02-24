import {Component, h} from '@stencil/core';

@Component({
  tag: 'zap-spinner',
  styleUrl: './zap-spinner.scss',
  shadow: true
})
export class Spinner {
  render() {
    return (<div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>)
  }
}
