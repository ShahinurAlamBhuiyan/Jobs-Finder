import { useState } from "react";

import { View, Text, ScrollView, SafeAreaView, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components';
import { TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";

const Home = () => {
    const { user, setUser } = useUser();

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("")
    const handleLogout = async () => {
        try {
            const res = await fetch('http://192.168.0.106:3001/api/users/logout', {
                method: 'POST',
            });

            const data = await res.json();
            console.log('Logout:', data);

            setUser(null); // Clear user from context
            router.replace('/sign-in');
        } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'Failed to logout');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.menu}
                            dimension="60%"
                        />
                    ),
                    headerRight: () => (
                        user ? (
                            <TouchableOpacity
                                onPress={handleLogout}
                                style={{
                                    backgroundColor: COLORS.primary,
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 6,
                                    marginRight: 12,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                onPress={() => router.push("/sign-in")}
                                style={{
                                    backgroundColor: COLORS.primary,
                                    paddingHorizontal: 12,
                                    paddingVertical: 6,
                                    borderRadius: 6,
                                    marginRight: 12,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign In</Text>
                            </TouchableOpacity>
                        )
                    )
                    ,
                    headerTitle: ""
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false} >
                <View
                    style={{ flex: 1, padding: SIZES.medium }}
                >
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                        userName={user?.name}
                    />

                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;