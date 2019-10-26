import * as React from 'react';
import './testComponent.scss';

export interface ITestProps {
    size: string,
    color: string,
    children: React.ReactNode
  }
  export interface ITestState {
    hasLoaded: boolean
  }
  
  export default class TestComponent extends React.Component<ITestProps, ITestState> {
  
    constructor(props: any) {
      super(props);
      this.state = {
        hasLoaded: false,
      };
    }

    public pretendToLoad(): Promise<boolean> {
        // Time wasting function
        return new Promise<boolean>((resolve, reject) => {
          setTimeout(() => {
              resolve(true);
          }, 3000);
      });
      }
  
    public componentDidMount() {
      this.pretendToLoad()
      .then(loaded => {
        this.setState({...this.state, hasLoaded: loaded });
      });
    }
  
    public render() {
  
      return (
        <section className={`test-section ${this.props.size}`}>
        {this.state.hasLoaded ? 
            <div className="test-loaded" style={{ color: this.props.color, fontWeight: `bold` }}>
                Hey there!! This is a test compoent, thanks for waiting! 
                {this.props.children}
            </div>
            :
            <div className="test-loading">
                Loading your component...
            </div>
        }
        </section>
      );
    }
  }