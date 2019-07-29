import React, { Component } from "react";
import Button from "../../components/reused/button";
class Step2LoadSubjectContent extends Component {
  state = {};
  setCloudSync(cloudSync) {
    this.props.setCloudSync(cloudSync);
    this.props.commit();
  }
  render() {
    return (
      <div>
        <div className="text-sm mb-2 text-gray-500">
          Uniboard Setup | Step 2 of 2
        </div>
        <div className="font-bold text-xl mb-2">
          Would you like to sync your data to your phone?
        </div>
        <div className="text-sm mb-2 text-gray-500">
          This will transfer subject names and links to content through the
          UniBoard severs to your phone. Please note that this feature is
          experimental.
        </div>
        <div className="mx-auto inline-flex mt-3">
          <div className="mx-3" onClick={() => this.setCloudSync(true)}>
            <Button>Yes, sync my data!</Button>
          </div>
          <div className="mx-3" onClick={() => this.setCloudSync(false)}>
            <Button>No Thanks :(</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Step2LoadSubjectContent;
