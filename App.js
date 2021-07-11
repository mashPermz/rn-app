import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString, value: goalTitle },
    ]);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const _renderItem = (itemData) => {
    return (
      <GoalItem
        id={itemData.item.id}
        title={itemData.item.value}
        onDelete={removeGoalHandler}
      />
    );
  };

  const _keyExtractor = (item, index) => `${item.id}_${index}`;

  return (
    <View style={styles.screen}>
      <Button title="Add Goals" onPress={() => setIsAddMode(true)} />
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} />
      <FlatList
        data={courseGoals}
        renderItem={_renderItem}
        keyExtractor={_keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
