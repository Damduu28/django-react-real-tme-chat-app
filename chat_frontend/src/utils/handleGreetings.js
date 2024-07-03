export const handleGreetings = (greetings, timeFormat = 24) => {
    const currentTime = new Date()

    let currentHour = currentTime.getHours()
    const currentMunite = currentTime.getMinutes()

    if (timeFormat === 12 && currentHour > 12) {
        currentHour -= 12
    }

    let greeting;

    if (currentHour < 12) {
        greeting = greetings.morning
    } else if (currentHour < 18) {
        greeting = greetings.afternoon
    }else{
        greeting = greetings.evening
    }

    return greeting
}

const customGreetings = {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
}

export const showGreetings = handleGreetings(customGreetings, 24)

console.log(showGreetings)