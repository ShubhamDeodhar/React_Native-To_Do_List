import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import GoalItem from './Components/GoalItem';
import GoalInput from './Components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoal] = useState([]);
  const [isModalOpen, toggleModal] = useState(false);
  const addGoalHandler = goaltitle => {
    if (goaltitle.length === 0) {
      return;
    }
    setCourseGoal(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goaltitle },
    ]);
    toggleModal(false);
  };
  const removeGoalHandler = goalId => {
    setCourseGoal(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };
  const cancelInput = () => {
    toggleModal(false);
  };
  return (
    <View style={styles.screen}>
      <Button title={'add new goal'} onPress={() => toggleModal(true)} />
      <GoalInput
        visible={isModalOpen}
        onAddGoal={addGoalHandler}
        onCancel={cancelInput}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemdata => (
          <GoalItem
            id={itemdata.item.id}
            onDelete={removeGoalHandler}
            title={itemdata.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
