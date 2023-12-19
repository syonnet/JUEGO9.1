import React, { useState, useEffect, image } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground } from "react-native";
import Card from "../components/Card";
import Score from "../components/Score";
import { useNavigation } from '@react-navigation/native';
// import cardData from "../assets/data/cardsData.json";

const GameScreen = () => {
    // const { cards } = cardData;
    const navigation = useNavigation();
    const cards = [
        require('../assets/image/01.png'),
        require('../assets/image/02.png'),
        require('../assets/image/03.png'),
        require('../assets/image/04.png'),
        require('../assets/image/05.png'),
        require('../assets/image/06.png')
    ];

    const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(timer);
                Alert.alert("Game Over", "Intentalo de nuevo Guerrero Z", [{ text: "OK", onPress: handleGameOver }]);
            } else {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleGameOver = () => {
        setBoard(() => shuffle([...cards, ...cards]));
        setSelectedCards([]);
        setMatchedCards([]);
        setScore(0);
        setTimeLeft(60);
    };

    useEffect(() => {
        if (selectedCards.length === 2) {
            const firstCard = board[selectedCards[0]];
            const secondCard = board[selectedCards[1]];

            if (firstCard === secondCard) {
                setMatchedCards([...matchedCards, ...selectedCards]);
                setSelectedCards([]);
                setScore(prevScore => prevScore + 10);
            } else {
                setScore(prevScore => prevScore - 1);

                const timeoutId = setTimeout(() => {
                    setSelectedCards([]);
                }, 1000);

                return () => clearTimeout(timeoutId);
            }
        }
    }, [selectedCards, board, matchedCards]);

    const handleTapCard = (index) => {
        if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
        setSelectedCards([...selectedCards, index]);
    };

    const didPlayerWin = () => matchedCards.length === board.length;
    const resetGame = () => { setMatchedCards([]); setScore(0); setSelectedCards([]); setTimeLeft(60) };

    return (
        <ImageBackground source={require('../assets/image/g.png')} style={styles.backgroundImage}>
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                {didPlayerWin() ? "Congratulations 🎉" : "Guerrero Z"}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainTab')}>
        <Text style={styles.timerIcon} >🔙</Text>
      </TouchableOpacity>
            <Text style={styles.timer}>Timer: {timeLeft}</Text>
            {/* <Timer onTimeOut={handleGameOver} /> */}
            <Score score={score} />
            <View style={styles.board}>
                {board.map((card, index) => {
                    const isTurnedOver =
                        selectedCards.includes(index) || matchedCards.includes(index);
                    return (
                        <Card
                            key={index}
                            isTurnedOver={isTurnedOver}
                            onPress={() => handleTapCard(index)}
                        >
                        { card }
                        </Card>
            );
                })}
        </View>
            {
        didPlayerWin() && (
            <TouchableOpacity style={styles.button} onPress={resetGame}>
                <Text style={styles.buttonText}>Jugar Otra Vez</Text>
            </TouchableOpacity>
        )
    }
    <StatusBar style="light" />
        </SafeAreaView >
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#da9b2545",
        alignItems: "center",
        justifyContent: "start",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    board: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    title: {
        fontSize: 32,
        fontWeight: "900",
        color: "snow",
        marginVertical: 15,
        textAlign: "center",
    },
    timer: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    timerIcon: {
        fontSize: 50,
        fontWeight: 'bold',
        position: 'absolute',
        top: 1,
        right: 100,
        // Agrega estilos adicionales según tus necesidades
      },
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}

export default GameScreen;

