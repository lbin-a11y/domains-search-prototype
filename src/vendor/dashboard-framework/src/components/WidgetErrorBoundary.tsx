import React from 'react';
import sentry from '../utils/globalSentry';
import Team from '@sqs/enums/Team';
import { WidgetErrorState } from './WidgetErrorState';

type ErrorBoundaryProps = {
  children: JSX.Element;
  widgetOwner: Team;
  loadingHeight: string;
  title: string;
};

type ErrorState = {
  hasError: boolean;
};

export class WidgetErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    sentry.withSquarespaceScope((scope) => {
      scope.setTag('owner', this.props.widgetOwner);
      sentry.captureException(error);
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <WidgetErrorState
          height={this.props.loadingHeight}
          title={this.props.title}
        />
      );
    }

    return this.props.children;
  }
}
