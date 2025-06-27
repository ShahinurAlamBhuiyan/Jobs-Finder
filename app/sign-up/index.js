import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    SafeAreaView
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from '../../constants';

const SignUp = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        if (email && name && password) {
            try {
                const res = await fetch('http://192.168.0.106:3001/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, name, password }),
                });

                const data = await res.json();
                console.log('Response:', res.status, data); // 👈 log everything

                if (res.ok) {
                    Alert.alert('Success', 'Account created!');
                    router.replace('/sign-in');
                } else {
                    Alert.alert('Error', data.message || 'Failed to sign up');
                }
            } catch (error) {
                console.error('Signup error:', error); // 👈 log catch error
                Alert.alert('Error', 'Something went wrong');
            }
        } else {
            Alert.alert('Error', 'All fields are required');
        }
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, padding: 20 }}>
            <Stack.Screen
                options={{
                    headerTitle: 'Sign Up',
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false
                }}
            />

            <View style={{ marginTop: 40 }}>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>Email</Text>
                <TextInput
                    placeholder='Enter your email'
                    value={email}
                    onChangeText={setEmail}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 10,
                        marginBottom: 16
                    }}
                />

                <Text style={{ fontSize: 16, marginBottom: 8 }}>name</Text>
                <TextInput
                    placeholder='Choose a name'
                    value={name}
                    onChangeText={setName}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 10,
                        marginBottom: 16
                    }}
                />

                <Text style={{ fontSize: 16, marginBottom: 8 }}>Password</Text>
                <TextInput
                    placeholder='Enter your password'
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 10,
                        marginBottom: 20
                    }}
                />

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={{
                        backgroundColor: COLORS.primary,
                        padding: 12,
                        borderRadius: 8,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace('/sign-in')} style={{ marginTop: 20 }}>
                    <Text style={{ color: COLORS.gray, textAlign: 'center' }}>
                        Already have an account? <Text style={{ color: COLORS.primary }}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SignUp;
