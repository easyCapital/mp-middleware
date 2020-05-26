import fetchMock from 'fetch-mock';
import { ioc } from '@adonisjs/fold';
import { Suite } from '../../../typings/@adonisjs';
const { test, afterEach, beforeEach, trait }: Suite = ioc.use('Test/Suite')('Onboarding controller');

trait('Test/ApiClient');

afterEach(async () => {
  fetchMock.reset();
});

beforeEach(async () => {
  fetchMock.get('begin:http://backoffice.test/api/question/search', backofficeJsonQuestions);
  fetchMock.get('begin:http://backoffice.test/api/step/search', backofficeJsonSteps);
});

test('get onboarding', async ({ client, assert }) => {
  const response = await client.get('/api/1.0/onboarding').header('Origin', 'http://mif.mieuxplacer.local').end();
  response.assertStatus(200);
  response.assertJSON({
    steps: [{ id: 'votre-profil', step: 1, blocks: ['1'] }],
    blocks: middlewareJsonBlocks,
    questions: middlewareJsonQuestions,
    answers: {},
  });
  assert.isTrue(fetchMock.called('http://backoffice.test/api/step/search'));
  assert.isTrue(fetchMock.called('http://backoffice.test/api/question/search?key__in=sub_contract_goal1'));
});

test('get onboarding with config key', async ({ client, assert }) => {
  const response = await client
    .get('/api/1.0/onboarding?config-key=cgp')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .end();
  response.assertStatus(200);
  assert.isTrue(fetchMock.called('http://backoffice.test/api/step/search?config_key=cgp'));
  assert.isTrue(
    fetchMock.called('http://backoffice.test/api/question/search?key__in=sub_contract_goal1&config_key=cgp'),
  );
});

test('get blocks', async ({ client, assert }) => {
  const response = await client
    .get('/api/1.0/onboarding/blocks?ids=1')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .end();
  response.assertStatus(200);
  response.assertJSON({
    blocks: middlewareJsonBlocks,
    questions: middlewareJsonQuestions,
    answers: {},
  });
  assert.isTrue(fetchMock.called('http://backoffice.test/api/step/search'));
  assert.isTrue(fetchMock.called('http://backoffice.test/api/question/search?key__in=sub_contract_goal1'));
});

test('get blocks with no ids', async ({ client, assert }) => {
  const response = await client
    .get('/api/1.0/onboarding/blocks')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .end();
  response.assertStatus(200);
  response.assertJSON({
    blocks: {},
    questions: {},
    answers: {},
  });
  assert.isTrue(fetchMock.called('http://backoffice.test/api/step/search'));
  assert.isFalse(fetchMock.called('http://backoffice.test/api/question/search?key__in=sub_contract_goal1'));
});

test('get blocks with config key', async ({ client, assert }) => {
  const response = await client
    .get('/api/1.0/onboarding/blocks?config-key=cgp&ids=1')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .end();
  response.assertStatus(200);
  assert.isTrue(fetchMock.called('http://backoffice.test/api/step/search?config_key=cgp'));
  assert.isTrue(
    fetchMock.called('http://backoffice.test/api/question/search?key__in=sub_contract_goal1&config_key=cgp'),
  );
});

test('get questions', async ({ client, assert }) => {
  const response = await client
    .get('/api/1.0/onboarding/questions')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .end();
  response.assertStatus(200);
  response.assertJSON({
    questions: middlewareJsonQuestions,
    answers: {},
  });
  assert.isTrue(fetchMock.called('http://backoffice.test/api/question/search'));
});

test('get questions with config key', async ({ client, assert }) => {
  const response = await client
    .get('/api/1.0/onboarding/questions?config-key=cgp')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .end();
  response.assertStatus(200);
  response.assertJSON({
    questions: middlewareJsonQuestions,
    answers: {},
  });
  assert.isTrue(fetchMock.called('http://backoffice.test/api/question/search?config_key=cgp'));
});

test('get questions by ids', async ({ client, assert }) => {
  const response = await client
    .get('/api/1.0/onboarding/questions?ids=a_question_key&ids=another_question_key')
    .header('Origin', 'http://mif.mieuxplacer.local')
    .end();
  response.assertStatus(200);
  response.assertJSON({
    questions: {},
    answers: {},
  });
  assert.isTrue(
    fetchMock.called('http://backoffice.test/api/question/search?key__in=a_question_key&key__in=another_question_key'),
  );
});

const backofficeJsonQuestions = [
  {
    key: 'sub_contract_goal1',
    used_by_algo: true,
    type: 'list',
    input_type: 'icon_checkbox',
    label: 'Mes objectifs',
    placeholder: '',
    is_active: true,
    required: true,
    is_sensitive: false,
    min: 1,
    max: 3,
    condition: 'true',
    show_if_authenticated: true,
    errors: {
      required: 'Vous devez sélectionner au moins 1 objectif.',
    },
    answers: [
      {
        value: '1',
        label: 'compléter vos revenus',
        exclusive: false,
        data: {
          icon:
            'https://mieuxplacercom.cdn.prismic.io/mieuxplacercom%2F887a405b-54e4-46ca-8329-2a9951754d20_compl%C3%A9ter+revenus.svg',
        },
      },
      {
        value: '2',
        label: 'transmettre à vos proches',
        exclusive: false,
        data: {
          icon:
            'https://mieuxplacercom.cdn.prismic.io/mieuxplacercom%2F74b4544a-2c4f-4e2c-8c0a-eee05b074f83_illustration-cagnotte.svg',
        },
      },
    ],
  },
];

const backofficeJsonSteps = [
  {
    step: '1',
    id: 'votre-profil',
    blocks: [
      {
        id: '1',
        label: 'Vous souhaitez épargner pour :  {sub_contract_goal1}',
        showIfAuthenticated: true,
        contextualHelpOpen: true,
        contextualHelpText: "Vous pouvez sélectionner jusqu'à 3 objectifs.",
        annotation: '',
      },
    ],
  },
];

const middlewareJsonBlocks = {
  '1': {
    id: '1',
    label: 'Vous souhaitez épargner pour :  {sub_contract_goal1}',
    showIfAuthenticated: true,
    contextualHelpOpen: true,
    contextualHelpText: "Vous pouvez sélectionner jusqu'à 3 objectifs.",
    annotation: null,
  },
};

const middlewareJsonQuestions = {
  sub_contract_goal1: {
    id: 'sub_contract_goal1',
    label: 'Mes objectifs',
    type: 'ICON_CHECKBOX',
    placeholder: null,
    required: true,
    min: 1,
    max: 3,
    sensitive: false,
    active: true,
    showIfAuthenticated: true,
    isUsedByAlgo: true,
    errors: [{ type: 'REQUIRED', label: 'Vous devez sélectionner au moins 1 objectif.' }],
    conditions: [],
    options: [
      {
        value: '1',
        exclusive: false,
        label: 'compléter vos revenus',
        data: {
          icon:
            'https://mieuxplacercom.cdn.prismic.io/mieuxplacercom%2F887a405b-54e4-46ca-8329-2a9951754d20_compl%C3%A9ter+revenus.svg',
        },
      },
      {
        value: '2',
        exclusive: false,
        label: 'transmettre à vos proches',
        data: {
          icon:
            'https://mieuxplacercom.cdn.prismic.io/mieuxplacercom%2F74b4544a-2c4f-4e2c-8c0a-eee05b074f83_illustration-cagnotte.svg',
        },
      },
    ],
  },
};
