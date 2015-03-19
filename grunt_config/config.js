module.exports = {
    'globals': [],
    'npmLoad': [],
    'tasksConfig': {
        'projName': 'unsw-eng-friction',
        'projVersion': '0.1.0',
        'deployFragment': 'repo/sims/<%= projName %>'
    },
    'tasks': {
        'rel': ["mocha:bamboo"]
    }
};