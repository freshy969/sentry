import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Pills from 'app/components/pills';
import Pill from 'app/components/pill';

class ExceptionMechanism extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    platform: PropTypes.string,
  };

  render() {
    let pills = [];

    if (this.props.data.mach_exception) {
      const {mach_exception} = this.props.data;
      if (mach_exception.exception_name) {
        pills.push(
          <Pill
            key="mach-exception"
            name="mach exception"
            value={mach_exception.exception_name}
          />
        );
      }
      if (mach_exception.code_name) {
        pills.push(
          <Pill key="mach-code" name="mach code" value={mach_exception.code_name} />
        );
      }
    }
    if (this.props.data.posix_signal) {
      const {posix_signal} = this.props.data;
      pills.push(
        <Pill key="signal" name="signal">
          {posix_signal.name} <em>({posix_signal.signal})</em>
        </Pill>
      );
    }

    if (this.props.data.type && this.props.data.description) {
      pills.push(
        <Pill
          key="generic"
          name={this.props.data.type}
          value={this.props.data.description}
        />
      );
      if (this.props.data.extra && _.isObject(this.props.data.extra)) {
        let counter = 0;
        _.forOwn(this.props.data.extra, function(value, key) {
          if (!_.isObject(value)) {
            pills.push(
              <Pill key={`generic-extra-${counter++}`} name={key} value={value} />
            );
          }
        });
      }
      if (this.props.data.handled !== undefined) {
        pills.push(
          <Pill
            key="generic-extra-handled"
            name="handled"
            value={this.props.data.handled}
          />
        );
      }
    }

    if (pills.length === 0) {
      return null;
    }

    return (
      <div className="exception-mechanism">
        <Pills>{pills}</Pills>
      </div>
    );
  }
}

export default ExceptionMechanism;
