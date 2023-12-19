import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const ScoresScreen = () => {
  // Datos de ejemplo de puntuaciones
  const scoresData = [
    { id: '1', playerName: 'Usuario 1', score: 120 },
    { id: '2', playerName: 'Usuario 2', score: 200 },
    { id: '3', playerName: 'Usuario 3', score: 80 },
    // Puedes agregar más datos de puntuaciones aquí
  ];

  const renderScoreItem = ({ item }) => {
    return (
      <Animatable.View animation="fadeInUp" delay={100} style={{ marginVertical: 5 }}>
        <Card style={{ backgroundColor: '#F5F5F5', padding: 10, elevation: 5 }}>
          <Card.Content style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.playerName}</Text>
            <Text style={{ fontSize: 16, color: '#888' }}>{item.score} puntos</Text>
          </Card.Content>
        </Card>
      </Animatable.View>
    );
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20, backgroundColor: '#EFEFEF' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' }}>Puntuaciones</Text>
      <FlatList
        data={scoresData}
        renderItem={renderScoreItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ScoresScreen;
