import { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    SafeAreaView
} from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { COLORS } from '../../constants'
import { useUser } from '../../context/UserContext'

const SignIn = () => {

    const { setUser } = useUser();
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async () => {
        if (email && password) {
            try {
                const res = await fetch('http://192.168.0.106:3001/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();

                if (res.ok) {
                    setUser(data.user);
                    Alert.alert('Success', 'Signed in!');
                    router.replace('/');
                } else {
                    Alert.alert('Error', data.message || 'Invalid credentials');
                }
            } catch (error) {
                console.error('Login error:', error);
                Alert.alert('Error', 'Something went wrong');
            }
        } else {
            Alert.alert('Error', 'Email and password are required');
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, padding: 20 }}>
            <Stack.Screen
                options={{
                    headerTitle: 'Sign In',
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false
                }}
            />

            <View style={{ marginTop: 50 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                    Welcome Back 👋
                </Text>

                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    style={{
                        borderWidth: 1,
                        borderColor: COLORS.gray2,
                        borderRadius: 6,
                        padding: 12,
                        marginBottom: 15
                    }}
                />

                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{
                        borderWidth: 1,
                        borderColor: COLORS.gray2,
                        borderRadius: 6,
                        padding: 12,
                        marginBottom: 25
                    }}
                />

                <TouchableOpacity
                    onPress={handleSignIn}
                    style={{
                        backgroundColor: COLORS.primary,
                        padding: 14,
                        borderRadius: 6,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Sign In</Text>
                </TouchableOpacity>

                {/* Navigate to Sign Up */}
                <TouchableOpacity onPress={() => router.push('/sign-up')} style={{ marginTop: 20 }}>
                    <Text style={{ color: COLORS.gray, textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignIn
