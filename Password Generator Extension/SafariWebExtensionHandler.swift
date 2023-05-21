//
//  SafariWebExtensionHandler.swift
//  Password Generator Extension
//
//  Created by Hanlon Miller on 4/24/23.
//

import SafariServices
import os.log
import Foundation
import SafariServices
/*
class PasswordGenerator {
    static func generatePassword(length: Int) -> String {
        let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
        var password = ""
        for _ in 0..<length {
            let index = Int(arc4random_uniform(UInt32(charset.count)))
            let character = charset.randomElement()
            password += character
        }
        return password
    }
}
*/
class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey]
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)

        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "Response to": message ] ]

        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}
