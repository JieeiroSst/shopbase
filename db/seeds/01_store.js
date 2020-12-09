exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("shopbase_stores")
    .del()
    .then(function () {
      return knex("shopbase_stores").insert({
        shop: "wweb",
        info: {
          api_key: "d4ba329cd5c8d566e9633ec4597b2002",
          password:
            "7cb1476b31d0b7db9ce529ac6c1145992d041c157ec13e1281c62efe07eb607b",
          url:
            "https://d4ba329cd5c8d566e9633ec4597b2002:7cb1476b31d0b7db9ce529ac6c1145992d041c157ec13e1281c62efe07eb607b@wweb.onshopbase.com/admin",
          domain:
            "wweb.onshopbase.com",
          secret_api: "d13fec20efc0b0de2e45010d3bbb0c43",
          token:
            "c7d54b168e926045504ce3af5a7226116efe6b592679085cc3bf0c59283b4b7f",
          currency:"USD"
        },
        values: {
          type: "service_account",
          id: "merchant-center-1607135893564",
          key_id: "a51c1996f4e02c168a106ba837e97781c2f829e5",
          private_key:
            "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjGxmaUqnSYlp7\nrsbo5tP2bYb/qGDypbuchCb4lLMIXWs+IzrDqA8MPTpX0u2UpGxl6+EAgkiujrr8\n+DzmDvaADq5IhO4u6QxvJniKEqeUXOyZiT0n4LR143XChENwWmWiZkNlF4kkuG5a\nVLypofIzNhA/St1ObtHKcvp6dDV+ZuWwLGNv0SY5CaarA+Vg5a5hHZL616N+eAoO\nF3mX3ouP+BGim24bAaLuhwOi3HqYRr2u9dK48fhuoWeo0ijXV6vATvHigHmFSnvF\nLVLGoOV2XAcdeFahwC+NB60emp5bvw9jF+aU6yBvef8jdgKtkGBcwNJVz8xGwZPc\n2AMxHt5tAgMBAAECggEAArSNXSjn1ix5cbm5ZN2HQHwalBz31q53CSaL+u2EdqwN\n/k7ZR6t+7GYLlK9T73Y2sg4Sgk6m4/ZMFawMXoh7AC6+J0fFJ5QH98P8ldWvX9+W\nsQk8sW+hrp7iMiK9d5yYOPRXQ9L7HFfOxMLJCks8WCsaY+Ja/1UJN8FmdCd/R6Ro\ne5s8guiotPP6D1y02rbzltZPaDm3G1PNcCpac48J3r026WA2p+epPf2mat126cBy\nmQLc61ULliaoJ9uSTmXJTEFXAo956UAIDrgFnbs/pbMKyH0NZP+evm4no+lOehez\nDxIoveqvVque5e1dOb5Lsq9BVgfVM+gTTcQlOkI8YQKBgQDWS+Esr9OmNttlF1Dz\nWkOaxyBc/XtU+ttK9JEWsU7iem+UdzcwjdEbNJ96lTCPSCrEMzrjmvmCa+9sFt4C\ndPyvR2pMeZwKb08rEyPSIR1SENHo7u1vcsbvrJYopO05qIHjqrkudGmkIT7EpOVk\nu+DoOvA1GEiB7Q9c6MopFr+jJQKBgQDC2PALJXSF/NakpacecDAElCACSWbTkUsU\nXLHPfeEL0L6AzHOKiRx6Jgd3+a5Tl9rkLec59qYNKX9Gk6qhzIyD4YuPh91+ORYX\nSiiC0v/WDvHdSptqlh+yy0V126mIo6dZsubjcWvCKyZeokz9TPDWV0ltIP3uzFME\n067xUskPqQKBgQDJfrONRw4lPXNxTEkraHYktJMznIw4zV8gzXEW+0UHIsSDvsy/\n9LjnccV6h4kPUHYV4W2/0VpGTaLj6WR6vvFRBj9nBPm5vgucnvSRgd2F6pbVBMNw\nhWWUupy+PsVn74+iOEbC7Wbfkvrn/3xKCXZiJfjyk5CpyfMmEyTzGZa7mQKBgElc\naoyXzpaACsS1BgYE0V938dFKl6eCpdUFzYDE8U2Ei6Vs1PfNBebLmLZIUKVyoFyX\nF98QCZcdD6mgAXenzyP8cJJa4j8a+UFNj5EqJl8PA2uBIqDv4wFrXTyxttQWYfT4\n0cvCsYLKwkiRLRGVvXvGI4QuDs2xKnS/yrdbpw35AoGAazfFjA7rYdICUmmtdhaj\nx+cUX2RKV39Zo7/kgoG393UWQuga6S0swIOXKNZ0DZUNb1v+QyQNsGitFJ7doYcd\nZpVbAO/xxkkS34QQmA2LXPIYS+2/6tX6PvZP4Y9u3ePhOqKUeQnBHxHP8bFVf+Hp\nn7qCBW4+z0KLf8JVmFbuwgA=\n-----END PRIVATE KEY-----\n",
          client_email:
            "merchant-center-1607135893564@merchant-center-1607135893564.iam.gserviceaccount.com",
          client_id: 110537753040209180786,
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/merchant-center-1607075773343%40merchant-center-1607075773343.iam.gserviceaccount.com",
        },
        google_sync: {
          values: [
            {
              id: 0,
              location: "US",
              mmc_merchant_id: "287534859",
            },
          ],
          single_variant: true,
          google_sync_token:
            "ya29.c.Kp0B5wfqFA4GtxSe4pD5TLkY1mjBKW316mhZBTIT_5tcys9MclvBQenwUx6iKUglDB__OERZNRvAOQVnkfrIta1gIQMp3FlRRNBTMheled4_G6BnG2JcAX-7yd8BJTo_Cejry0Nsak6QAjITwXbcw1aE9boENILCYojBM_pl0Pw1dQYn7ce1-g88ABl-SyfF5DPPfx3kfRRDh1mrSEL39A",
        },
      });
    });
};
