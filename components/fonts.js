import * as Font from 'expo-font';

export const loadFonts = async () => {
    await Font.loadAsync({
        'golden-regular': require('../assets/fonts/golden.ttf'),
        'Gumela': require('../assets/fonts/Gumela.ttf'),
        
    });
};
