import React, { useCallback } from 'react';

import { Platform } from '@models';
import GenericList from '@components/GenericList';
import ListItem from '@components/ListItem';

import {
  Container,
  GamesList,
  GamePill,
  Title,
  PublisherName,
} from './Game.style';

export interface Props {
  name: string;
  publisherName: string;
  platforms?: Platform[];
}

export const Game = ({
  name,
  publisherName,
  platforms = [],
}: Props): React.ReactElement => {
  const handlePlatformClick = useCallback((platform: Platform): void => {
    console.log(`Selected ${platform.name}`);
  }, []);

  return (
    <Container>
      <Title>{name}</Title>
      <PublisherName>{publisherName}</PublisherName>
      <GenericList
        data={platforms}
        keyExtractor={(item: Platform) => item.id}
        container={GamesList}
        renderItem={(item: Platform) => (
          <ListItem
            as="li"
            item={item}
            labelExtractor={({ name }: Platform) => name}
            onClick={handlePlatformClick}
            container={GamePill}
          />
        )}
      />
    </Container>
  );
};
