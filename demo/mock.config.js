module.exports = {
  common: {
    port: 8000,
    timeout: 0,
    rate: 1,
    debug: true
  },
  ["1710YearGrandCeremony"] (req) {
    // console.log('req.query.len', req.query.len)
    const len = req.query.len || 2
    return {
      code: 0,
      [`data|${len}`]: [{
        'uid|1000-99999': 999,
        'sid': '@id',
        'name': '@cname',
        'noble_title_id|100-106': 100,
        'support|1000-9000':8000,
        'asid|1000-9000':8000
      }],
      result: true
    }
  },
  '1710YearGrandCeremony2': {
    code: 0,
    'data|10': [{
      'uid|1000-99999': 999,
      'sid': '@id',
      'name': '@cname',
      'noble_title_id|100-106': 100,
      'support|1000-9000':8000,
      'asid|1000-9000':8000
    }],
    result: true
  }
}
