import { View, Text } from '@idimma/rn-widget';
import { AddCircle, CloseCircle, MinusCirlce, Refresh2, Setting2 } from "iconsax-react-native";
import { useState } from "react";
import { Modal, Switch, TextInput, TouchableOpacity } from "react-native";

function Home() {
    const [count, setCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [counter, setCounter] = useState('0'); // String for TextInput
    const [isEnabled, setIsEnabled] = useState(false);
    const [maxLimit, setMaxLimit] = useState(0); // Number instead of `any`

    const toggleSwitch = () => setIsEnabled(prev => !prev);

    const handleAdditionClick = () => {
        if (isEnabled && count >= maxLimit) return;
        setCount(prevCount => prevCount + 1);
    };

    const handleSubClick = () => setCount(prevCount => prevCount - 1);

    const handleSetCount = () => {
        const newCount = Number(counter);
        if (!isNaN(newCount)) {
            setCount(newCount);
            setMaxLimit(newCount);
        }
    };

    return (
        <View w="100%" h="100%" px={20} py={100} bg="black" style={{ alignItems: 'center' }} justify="space-between">
            <View row gap={16}>
                <Setting2 size="28" color="#FFF" onPress={() => setModalVisible(true)} />
                <Refresh2 size="28" color="#FFF" onPress={() => setCount(0)} />
            </View>

            <View center>
                <Text color="white" bold fs={72}>{count}</Text>
            </View>

            <View justify="space-between" row gap={16} w="100%" align="flex-end">
                <AddCircle size="32" color="#fff" onPress={handleAdditionClick} />
                {count !== 0 && <MinusCirlce size="32" color="#FFF" onPress={handleSubClick} />}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', gap: 12, paddingHorizontal: 15 }}>
                    <Text bold fs={20} white>Settings</Text>

                    {/* Set Counter */}
                    <View row center w={'100%'} h={100} p-4 style={{ borderRadius: 12, borderColor: '#f7f7f8', borderStyle: 'solid', borderWidth: 1, gap: 10 }}>
                        <Text bold fs={16} white>Set Count:</Text>
                        <TextInput
                            value={counter}
                            onChangeText={setCounter} // Keep it in string format
                            keyboardType="numeric"
                            style={{
                                backgroundColor: '#f7f7f8',
                                borderWidth: 1,
                                borderColor: '#f7f7f8',
                                borderRadius: 4,
                                width: 50,
                                height: 30,
                                padding: 5,
                                textAlign: 'center'
                            }}
                        />
                        <TouchableOpacity onPress={handleSetCount}>
                            <Text color="white">Apply</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Set Max Limit */}
                    <View center w={'100%'} h={150} p-4 style={{ borderRadius: 12, borderColor: '#f7f7f8', borderStyle: 'solid', borderWidth: 1, gap: 10 }}>
                        <View row center w="100%" p-4 gap={10}>
                            <Text bold fs={16} white>
                                Limits <Text bold fs={16} white>{isEnabled ? 'On' : 'Off'}</Text>
                            </Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        {isEnabled && (
                            <View row center w="100%" p-4 gap={10}>
                                <Text bold fs={16} white>Maximum = </Text>
                                <TextInput
                                    style={{
                                        backgroundColor: '#f7f7f8',
                                        borderWidth: 1,
                                        borderColor: '#f7f7f8',
                                        borderRadius: 4,
                                        width: 50,
                                        height: 30,
                                        padding: 5,
                                        textAlign: 'center'
                                    }}
                                    keyboardType="numeric"
                                    value={maxLimit.toString()}
                                    onChangeText={(text) => {
                                        const num = Number(text);
                                        if (!isNaN(num)) {
                                            setMaxLimit(num);
                                        }
                                    }}
                                />
                            </View>
                        )}
                    </View>

                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <CloseCircle size="28" color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

export default Home;
