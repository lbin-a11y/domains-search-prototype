import React from 'react';
import { Checkmark, CheckmarkCircle } from '@sqs/rosetta-icons';
import { Flex, Text } from '@sqs/rosetta-primitives';
import { Card, ActivityIndicator } from '@sqs/rosetta-elements';
import { handleEnterKeyDown } from '@sqs/universal-utils';

type IconProps = {
  sx?: any;
};

export type SetupTodoProps = {
  title: string;
  text: string;
  todoIcon: React.ComponentType<React.PropsWithChildren<IconProps>>;
  onMouseOver?: () => void;
  onClick?: () => void;
  isDone: boolean;
  isDisabled?: boolean;
  dataTestId?: string;
  isLoading?: boolean;
  doneIcon?: React.ComponentType<React.PropsWithChildren<IconProps>>;
  hide?: boolean;
};

const SetupTodo: React.FC<SetupTodoProps> = ({
  title,
  text,
  todoIcon: TodoIconComponent,
  onMouseOver,
  onClick,
  isDone,
  isDisabled,
  dataTestId,
  isLoading,
  doneIcon: IconComponent,
  hide,
}) => {
  const baseColor = isDisabled ? 'gray.600' : isDone ? 'gray.300' : 'gray.100';
  const isHoverable = !isDisabled && !!onClick;

  return (
    <Card
      tabIndex={isHoverable ? 0 : -1}
      isHoverable={isHoverable}
      role="button"
      sx={{
        display: hide ? 'none' : 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'not-allowed' : onClick ? 'pointer' : undefined,
        alignItems: 'center',
      }}
      px={3}
      py={3}
      mb={2}
      width={'100%'}
      minHeight="sizes.400"
      onMouseOver={onMouseOver}
      data-testid={dataTestId}
      onClick={!isDisabled ? onClick : undefined}
      onKeyDown={handleEnterKeyDown(() => !isDisabled && onClick?.())}
    >
      <Flex alignItems="center">
        <TodoIconComponent
          sx={{
            marginRight: 3,
            color: baseColor,
          }}
        />
        <div>
          <Text.Body
            color={baseColor}
            fontWeight="medium"
            m={0}
            p={0}
          >
            {title}
          </Text.Body>
          <Text.Caption
            color={baseColor}
            m={0}
            p={0}
            as="p"
          >
            {text}
          </Text.Caption>
        </div>
      </Flex>
      <Flex>
        {isLoading ? (
          <ActivityIndicator size={0} />
        ) : (
          IconComponent &&
          isDone && (
            <IconComponent />
          )
        )}
        {isDone ? (
          <CheckmarkCircle sx={{ color: 'green.300', marginLeft: 3 }} />
        ) : (
          <Checkmark sx={{ color: 'gray.600' }} />
        )}
      </Flex>
    </Card>
  );
};

export default SetupTodo;
