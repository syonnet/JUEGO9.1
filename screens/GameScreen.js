import React, { useState, useEffect, useRef } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground } from "react-native";
import Card from "../components/Card";
import Score from "../components/Score";
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const GameScreen = () => {
    const navigation = useNavigation();
    const cards = [
        require('../assets/image/01.png'),
        require('../assets/image/02.png'),
        require('../assets/image/03.png'),
        require('../assets/image/04.png'),
        require('../assets/image/05.png'),
        require('../assets/image/06.png')
    ];
    const Golden = 'golden.ttf';
    const Gumela = 'Gumela.ttf';

    const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const timerRef = useRef(null);

    const [sound, setSound] = useState();

    const loadSuccessSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/ok.mp3')
        );
        setSound(sound);
    };

    const playSuccessSound = async () => {
        try {
            if (!sound) {
                await loadSuccessSound();
            }

            if (sound) {
                await sound.replayAsync();
            }
        } catch (error) {
        }
    };
    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (timeLeft === 0) {
                clearInterval(timerRef.current);
                handleGameOver();
            } else {
                setTimeLeft(prevTime => prevTime - 1);
            }
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [timeLeft]);

    useEffect(() => {    //  lógica para verificar si las cartas son iguales
        if (selectedCards.length === 2) {
            const firstCard = board[selectedCards[0]];
            const secondCard = board[selectedCards[1]];

            if (firstCard === secondCard) {
                setMatchedCards([...matchedCards, ...selectedCards]);
                setSelectedCards([]);
                setScore(prevScore => prevScore + 10);

                playSuccessSound();

            } else {
                setScore(prevScore => prevScore - 1);

                const timeoutId = setTimeout(() => {
                    setSelectedCards([]);
                }, 1000);

                return () => clearTimeout(timeoutId);
            }
        }
    }, [selectedCards, board, matchedCards]);

    const handleBlur = () => {
        clearInterval(timerRef.current);
    };

    const handleFocus = () => {
        setTimeLeft(60); // Reiniciar el temporizador al entrar en la pantalla
    };

    useEffect(() => {
        const unsubscribeBlur = navigation.addListener('blur', handleBlur);
        const unsubscribeFocus = navigation.addListener('focus', handleFocus);

        return () => {
            unsubscribeBlur();
            unsubscribeFocus();
        };
    }, [navigation]);


    const handleTapCard = (index) => {
        if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
        setSelectedCards([...selectedCards, index]);
    };

    const didPlayerWin = () => matchedCards.length === board.length;

    const handleGameOver = () => {
        Alert.alert(
            "Game Over",
            "¿Quieres intentarlo de nuevo?",
            [
                {
                    text: "Sí",
                    onPress: () => {
                        resetGame();
                    }
                },
                {
                    text: "No",
                    onPress: () => {
                        navigation.navigate('MainTab'); // Regresar a la pantalla de perfil al presionar "No"
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const resetGame = () => {
        setBoard(() => shuffle([...cards, ...cards]));
        setSelectedCards([]);
        setMatchedCards([]);
        setScore(0);
        setTimeLeft(60);
    };

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array;
    }

    return (
        <ImageBackground source={require('../assets/image/g.png')} style={styles.backgroundImage}>
            <SafeAreaView style={styles.container}>
                <Text style={{ fontFamily: 'golden-regular', fontSize: 36, color:'#1d5996ed' }}>
                    {didPlayerWin() ? "🎉Felicidades 🎉" : "Guerrero Z"}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('MainTab')}>
                    <Text style={styles.timerIcon} >🔙</Text>
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Gumela', fontSize: 26 }}>Timer: {timeLeft}</Text>
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
                                {card}
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
        justifyContent: "center",
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
    },
});



export default GameScreen;

