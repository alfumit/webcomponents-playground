import {Component, h, Method, Prop, State} from "@stencil/core";

@Component({
  tag: "zap-side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true
})
export class SideDrawer {
  @Prop({attribute: "x-title", reflect: true, mutable: true}) title: string;
  @Prop({attribute: "open", reflect: true, mutable: true}) open: boolean = false;
  @Prop({attribute: "pull-text"}) pullText: string = "Side Menu";
  @Prop() stickDirection: 'left' | 'right' = 'left';

  @State() activeTab: 'navigation' | 'contactInfo' = 'navigation';

  render() {
    let mainContent = <slot></slot>
    if (this.activeTab === 'contactInfo') {
      mainContent = (
        <div id="contact-info">
          <h2>Contact Info</h2>
          <p>You are important to us, so just wait. We'll answer someday</p>
          <ul>
            <li>Our address is in the middle of nowhere</li>
            <li>Our phone is largely unavailable</li>
          </ul>
        </div>
      )
    }

    return [
      <div id="backdrop" onClick={(e: Event) => this.closeHandler(e)} />,
      <div id="drawer-pull" class={`stick-${this.stickDirection}`}>
        <div>
          <p onClick={this.openDrawer.bind(this)}>{this.pullText}</p>
          <button onClick={this.changeStick.bind(this)}>Stick to the other side</button>
        </div>
      </div>,
      <aside class={`stick-${this.stickDirection}`}>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.closeHandler.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button
            class={this.activeTab === 'navigation' ? 'active' : ''}
            onClick={() => this.onTabSwitch('navigation')}>Navigation</button>
          <button
            class={this.activeTab === 'contactInfo' ? 'active' : ''}
            onClick={() => this.onTabSwitch('contactInfo')}>Contact Info</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    ]
  }

  closeHandler(_: Event): void {
    this.open = false;
  }

  onTabSwitch(tabName: 'navigation' | 'contactInfo'): void {
    this.activeTab = tabName;
  }

  @Method()
  openDrawer() {
    this.open = true;
  }

  @Method()
  changeStick() {
    if(this.stickDirection === 'left') {
      this.stickDirection = 'right';
    } else {
      this.stickDirection = 'left';
    }
  }

}


