export let chartConfig:any = {
    type: 'line',
    data: {
            labels: [],
            datasets: [{
                    label: "none",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: []
            }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: "time",
                title: {
                    display: true,
                    text: "none"
                },
                time: {
                    displayFormats: {
                    second: 'h:mm:ss',
                    },
                },
                adapters: {
                    date: {
                        locale: "nl"
                    }
                },
                ticks: {
                    autoSkip: true,
                    autoSkipPadding: 10,
                    maxRotation: 0
                },
            },
            y: {
                title: {
                    display: true,
                    text: "none"
                },
                type: "time",
                time: {
                    displayFormats: {
                    second: 'h:mm:ss',
                    },
                },
                adapters: {
                    date: {
                        locale: "nl"
                    }
                },
                ticks: {
                    autoSkip: true,
                    autoSkipPadding: 10,
                    maxRotation: 0
                },
            }
        },
        plugins: {
        decimation: {
        enabled: true,
        algorithm: 'lttb',
        samples: 100,
        threshold: 100,
            },
        },
    }
}

export let linearScaleConfig = {
    type: "linear",
    title: {
        display: true,
        text: "none"
    },
}

export let timeScaleConfig = {
    title: {
        display: true,
        text: "none"
    },
    type: "time",
    time: {
        displayFormats: {
        second: 'h:mm:ss',
        },
    },
    adapters: {
        date: {
            locale: "nl"
        }
    },
    ticks: {
        autoSkip: true,
        autoSkipPadding: 10,
        maxRotation: 0
    },
}